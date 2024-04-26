import { Request, Response } from "express";
import { courseService } from "../services/courseService";

export const coursesController = {
  //GET /coureses/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const course = await courseService.findBuIdWithEpisodes(id);
      return res.json(course);
    } catch (err) {}
  },
};
