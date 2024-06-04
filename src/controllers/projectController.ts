import { Request, Response } from 'express';
import Project from '../models/project';
import ProjectTag from '../models/projectTag';


export const addProject = async (req: Request, res: Response) => {
    try {
        const { title, description, tagId} = req.body;
        if (!title || !description || !tagId)
          return res.status(400).send({ message: 'Required parameter missing' });
        let userId
        if(req.user){
           userId= req.user.id;
        }
        const projectTag = await ProjectTag.findOne({ where: { id:tagId} });
        if (!projectTag){
            return res.status(404).send({ message: 'ProjectTag not found' });
        }
           
        const project = await Project.create({ title, description, userId, tagId });
        res.status(201).send({ message: 'Project created successfully', project }); 
    } catch (error) {
        res.status(500).send({message:'Internal server error'})
    }
  
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { title, description, tagId } = req.body;
        const { id } = req.params;
        if (!id ||!title || !description || !tagId)
          return res.status(400).send({ message: 'Required parameter missing' });
        let userId
        if(req.user){
           userId= req.user.id;
        }
        const project = await Project.findOne({ where: { id, userId } });
        if (!project) {
          return res.status(404).send({ message: 'Project not found' });
        }
        await project.update({ title, description,tagId });
        res.status(200).send({ message: 'Project updated successfully', project });  
    } catch (error) {
        res.status(500).send({message:'Internal server error'});
    }
 
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id )
            return res.status(400).send({ message: 'Required parameter missing' });
        let userId
        if(req.user){
           userId= req.user.id;
        }
        const project = await Project.findOne({ where: { id, userId } });
        if (!project) {
          return res.status(404).send({ message: 'Project not found' });
        }
        await project.destroy();
        res.status(200).send({ message: 'Project deleted successfully' }); 
    } catch (error) {
        res.status(500).send({message:'Internal server error'});
    }
  
};

export const listProjects = async (req: Request, res: Response) => {
    try {
        let userId
        if(req.user){
           userId= req.user.id;
        }
        const projects = await Project.findAll({where:{userId}, include: [ProjectTag] });
        res.status(200).send({ projects });
    } catch (error) {
        res.status(500).send({message:'Internal server error'});
    }
  
};


