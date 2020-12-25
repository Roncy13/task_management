import {NodePlopAPI} from 'plop';
 
export default function (plop: NodePlopAPI) {
  const generator: any = {
    description: 'Generator For Creating API Component, Smurf.',
    prompts: [
      {
        type: 'AddMany'
      }
    ]
  };
  plop.setGenerator('Smurf Api', generator);
};