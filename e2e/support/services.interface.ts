import { InformationService, JobsService, ApiService } from '../../src/app/codinglab-api';

export interface Services {
  ApiService: ApiService;
  JobsService: JobsService;
  InformationService: InformationService;
}
