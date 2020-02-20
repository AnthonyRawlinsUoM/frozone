import { Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { PeopleHouseLoss } from "../../entity/phibc-post-proc-results/PeopleHouseLoss";

@Service()
export class PeopleHouseLossService {
    private connection: Connection;

    constructor(private typeORMService: TypeORMService) {
    }

    $afterRoutesInit() {
        this.connection = this.typeORMService.get();
    }

    async find(): Promise<PeopleHouseLoss[]> {
        let bds: any[] = await this.connection.manager.find(PeopleHouseLoss);
        // bds.forEach((bd) => {});

        // console.log("Loaded PeopleHouseLoss: ", bds);

        return bds;
    }

    async findOne(id: number): Promise<PeopleHouseLoss> {
        const bd = await this.connection.manager.findOne(PeopleHouseLoss, id);
        return bd;
    }

}
