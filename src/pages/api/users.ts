import {NextApiRequest, NextApiResponse} from 'next';


export default (req: NextApiRequest, res: NextApiResponse) => {
    const users = [
        {key: 1, nome: 'Nicolas', idade: 23, profissao: 'jogador'},
        {key: 2, nome: 'Joaquim', idade: 21, profissao: 'marketeiro'},
    ]
    return res.json(users);
}