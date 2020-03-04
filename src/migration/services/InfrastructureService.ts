import { Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { Infrastructure } from "../../entity/phibc-post-proc-results/Infrastructure";

@Service()
export class InfrastructureService {
    private connection: Connection;

    constructor(private typeORMService: TypeORMService) {
    }

    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }

    async find(): Promise<Infrastructure[]> {
        let bds: any[] = await this.connection.manager.find(Infrastructure);
        // bds.forEach((bd) => {});

        // console.log("Loaded Infrastructure: ", bds);

        return bds;
    }

    async findOne(id: number): Promise<Infrastructure> {
        const bd = await this.connection.manager.findOne(Infrastructure, id);
        return bd;
    }

}
