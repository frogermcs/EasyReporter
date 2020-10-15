import {IsNotEmpty, ValidateNested, Min} from "class-validator";

interface IProgress { 
    project: string;
    progress: number;
    timestamp: number;
}

export class Progress implements IProgress {
    @IsNotEmpty()
    project: string;
    
    @IsNotEmpty()
    progress: number;
    
    @Min(1)
    timestamp: number;

    constructor(
        progress: IProgress = {
            project: "",
            progress: 0,
            timestamp: 0
    }) {
        this.project = progress.project;
        this.progress = progress.progress;
        this.timestamp = progress.timestamp;
    }
}

export class WrappedProgress {
    @ValidateNested({ each: true })
    public list: Progress[];
  
    constructor(list: Progress[]) {
      this.list = list;
    }
}