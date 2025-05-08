type Ingrident = {
    Name: string,
    Count: number,
    Type: string
};

type Instruction = {
    Id: number,
    Name: string
};

export type Recipe = {
    Id: number,
    Name: string,
    Img: string,
    Duration: number,
    Difficulty: number,
    Description: string,
    Categoryid: number,
    UserId: number,
    Ingridents: Ingrident[],
    Instructions: Instruction[]
};