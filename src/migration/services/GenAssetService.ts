import { Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { GenAsset } from "../../entity/phibc-post-proc-results/GenAsset";

@Service()
export class GenAssetService {
    private connection: Connection;

    constructor(private typeORMService: TypeORMService) {
    }

    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }

    async find(): Promise<GenAsset[]> {
        let bds: any[] = await this.connection.manager.find(GenAsset);
        return bds;
    }

    async findOne(id: number): Promise<GenAsset> {
        const bd = await this.connection.manager.findOne(GenAsset, id);
        return bd;
    }

}
