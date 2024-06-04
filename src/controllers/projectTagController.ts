import { Request, Response } from 'express';
import Project from '../models/project';
import ProjectTag from '../models/projectTag';


export const addTag=async(req:Request,res:Response)=>{
    try {
        const { tagName} = req.body;
        if (!tagName )
            return res.status(400).send({ message: 'Required parameter missing' });
        const tag = await ProjectTag.findOne({ where: { name: tagName } });
        if (tag) {
          return res.status(409).send({message: 'Tag Already Exists!',tag });
        }
        else{
            const newTag=await ProjectTag.create({name:tagName});
            res.status(200).send({ message: 'Tag created successfully',tag:newTag });
        }
    } catch (error) {
        res.status(500).send({message:'Internal server error'});
    }
}

export const fetchProjectsByTag = async (req: Request, res: Response) => {
    try {
        const { tagName} = req.params;
        if (!tagName)
            return res.status(400).send({ message: 'Required parameter missing' });
        const projects = await Project.findAll({
          include: [
            {
              model: ProjectTag,
              where: { name: tagName},
            },
          ],
        });
        if(!projects)
            return res.status(404).send({ message: 'Project not found' });
        res.status(200).send({ projects }); 
    } catch (error) {
        res.status(500).send({message:'Internal server error'});
    }
  
};
