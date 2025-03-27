import likeR from "./like.repository.js";

const likeRepository = new likeR();
export default class likeC{

    async add(req, res){
            await likeRepository.add(req.params.pid,req.params.uid);
            res.status(201).end();
    }
    async remove(req, res){
        await likeRepository.remove(req.params.pid,req.params.uid);
        res.status(201).end();
    }
}