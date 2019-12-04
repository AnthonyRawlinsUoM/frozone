import { Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { BioDiversity } from "../entity/phibc-post-proc-results/BioDiversity";

@Service()
export class BioDiversityService {
    private connection: Connection;

    constructor(private typeORMService: TypeORMService) {
    }

    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }

    async find(): Promise<BioDiversity[]> {
        let bds: any[] = await this.connection.manager.find(BioDiversity);
        // bds.forEach((bd) => {});

        // console.log("Loaded BioDiversity: ", bds);

        return bds;
    }

    async findOne(id: number): Promise<BioDiversity> {
        const bd = await this.connection.manager.findOne(BioDiversity, id);
        return bd;
    }

}
