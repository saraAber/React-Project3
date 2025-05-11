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

export const initRecipe: Recipe = {
    Id: 0,
    Name: "",
    Img: "",
    Duration: 0,
    Difficulty: 0,
    Description: "",
    Categoryid: 0,
    UserId: 0,
    Ingridents: [],
    Instructions: []
};