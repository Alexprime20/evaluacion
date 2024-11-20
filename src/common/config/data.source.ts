import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ConfigModule, ConfigService } from '@nestjs/config';


ConfigModule.forRoot({
    envFilePath: `.env.development`,
});

const configService = new ConfigService();

export const DataSourceConfig:DataSourceOptions = {
    type: 'postgres',
    host: configService.get("localhost"),
    port: +configService.get("5432"),
    username: configService.get("umarket"),
    password: configService.get("secret123456"),
    database: configService.get("market"),
    entities: [ __dirname + './../../**/**/*.entity{.ts,.js}' ],
    migrations: [ __dirname + './../../migrations/*{.ts,.js}' ],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
}

export const AppDS = new DataSource(DataSourceConfig);