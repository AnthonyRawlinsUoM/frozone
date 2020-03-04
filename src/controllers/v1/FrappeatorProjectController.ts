import { PathParams, MergeParams, BodyParams, Controller, Get, Post } from "@tsed/common";
import { ReturnsArray } from "@tsed/swagger";
import { FrappeatorProjectService } from '../../migration/services/FrappeatorProjectService';
import { FrappeatorProject } from '../../entity/v4/FrappeatorProject';

@Controller("/projects")
export class FrappeatorProjectController {

    constructor(private projectService: FrappeatorProjectService) { }

    @Get("/")
    @ReturnsArray(FrappeatorProject)
    async getList(): Promise<FrappeatorProject[]> {
        return this.projectService.find();
    }

    @Get("/:id")
    async get(@PathParams("id") id: number) {
        return this.projectService.findOne(id);
        // return { "id": 1, "type": "Project" }
    }

    @Post("/")
    create(@BodyParams() project: FrappeatorProject): Promise<FrappeatorProject> {
        return this.projectService.create(project);
    }

}
