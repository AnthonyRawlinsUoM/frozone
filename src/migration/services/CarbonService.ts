import { Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { Carbon } from "../../entity/phibc-post-proc-results/Carbon";

@Service()
export class CarbonService {
    private connection: Connection;

    constructor(private typeORMService: TypeORMService) {
    }

    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }

    async find(): Promise<Carbon[]> {
        let bds: any[] = await this.connection.manager.find(Carbon);
        // bds.forEach((bd) => {});

        // console.log("Loaded Carbon: ", bds);

        return bds;
    }

    async findOne(id: number): Promise<Carbon> {
        const bd = await this.connection.manager.findOne(Carbon, id);
        return bd;
    }

}
