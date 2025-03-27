import commentR from "./comments.repository.js";

const commentRepository = new commentR();
export default class commentC{

    async add(req, res){
        const {content} = req.body;
        console.log(content);
        const { pid, uid } = req.params;

        try{
            const post = await commentRepository.add(content,uid,pid);
            res.status(201).send("Comment Successfully added");
        }
        catch(err){
            console.log(err);
            res.status(401).send("Cannot add");
        }
    }

    async get(req, res){
        const id = req.params.id;
        try{
            const comment = await commentRepository.get(id);
            res.status(201).send(comment);
        }

        catch(err){
            res.status(401).send("Cannot get !");
        }
    }

    async delete(req, res){
        const id = req.params.id;
        try{
            const comment = await commentRepository.delete(id);
            res.status(201).send(comment);
        }

        catch(err){
            console.log(err);
            res.status(401).send("Cannot delete !");
        }
    }

    async update(req, res){
        const uid = req.params.uid;
        const pid = req.params.pid;
        const cid = req.params.cid;
        const {content} = req.body;
        const newComment = {
            content:content,
        }
        try{
            const comment = await commentRepository.update(uid,pid,cid, newComment);
            res.status(201).send(comment);
        }

        catch(err){
            console.log(err);
            res.status(401).send("Cannot update !");
        }
    }
}