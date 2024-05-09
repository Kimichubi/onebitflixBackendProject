import { Favorite } from "../models/Favorite";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    const favorite = Favorite.create({
      courseId,
      userId,
    });
    return favorite;
  },
  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: { userId: userId },
      include: {
        association: "Course",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });

    return {
        userId,
        courses: favorites.map(favorites => favorites.Course)
    };
  },
};
