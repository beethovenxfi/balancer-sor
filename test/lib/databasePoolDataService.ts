import { PoolDataService, SubgraphPoolBase } from '../../src';

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export class DatabasePoolDataService implements PoolDataService {
    public async getPools() {
        console.log('getting pools....');

        const excludedFromRouting = [
            // UST 4pool
            '0x6da14f5acd58dd5c8e486cfa1dc1c550f5c61c1c0000000000000000000003cf',
            // old DEI boosted
            '0xdfc65c1f15ad3507754ef0fd4ba67060c108db7e000000000000000000000406',
            '0xf29d0e14d9cf0d2db13f4f9655e33d527267cf7e000200000000000000000747',
        ];

        const pools = await prisma.prismaPool.findMany({
            where: {
                dynamicData: {
                    totalSharesNum: {
                        gt: 0.0001,
                    },
                },
                categories: {
                    none: { category: 'BLACK_LISTED' },
                },
                id: {
                    notIn: excludedFromRouting,
                },
                chain: 'FANTOM',
            },
            include: {
                dynamicData: true,
                stableDynamicData: true,
                linearDynamicData: true,
                linearData: true,
                tokens: {
                    include: { dynamicData: true, token: true },
                    orderBy: { index: 'asc' },
                },
            },
        });

        console.log('found pools: ', pools.length);

        const mappedPools: SubgraphPoolBase[] = pools.map((pool) => ({
            ...pool,
            ...pool.dynamicData!,
            ...pool.stableDynamicData,
            ...pool.linearData,
            ...pool.linearDynamicData,
            totalLiquidity: `${pool.dynamicData!.totalLiquidity}`,
            factory: pool.factory || undefined,
            poolType: this.mapPoolTypeToSubgraphPoolType(pool.type),
            tokensList: pool.tokens.map((token) => token.address),
            totalWeight: '1', //TODO: properly calculate this
            tokens: pool.tokens.map((token) => ({
                ...token.token!,
                ...token.dynamicData!,
            })),
        }));

        return mappedPools;
    }

    private mapPoolTypeToSubgraphPoolType(poolType: string): string {
        switch (poolType) {
            case 'WEIGHTED':
                return 'Weighted';
            case 'LIQUIDITY_BOOTSTRAPPING':
                return 'LiquidityBootstrapping';
            case 'STABLE':
                return 'Stable';
            case 'META_STABLE':
                return 'MetaStable';
            case 'PHANTOM_STABLE':
                return 'StablePhantom';
            case 'COMPOSABLE_STABLE':
                return 'StablePhantom';
            case 'LINEAR':
                return 'Linear';
            case 'ELEMENT':
                return 'Element';
            case 'INVESTMENT':
                return 'Investment';
            case 'GYRO':
                return 'GyroE';
        }

        return 'UNKNOWN';
    }
}
