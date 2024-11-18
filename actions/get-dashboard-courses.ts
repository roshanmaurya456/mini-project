import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
};

export const getCourses = async ({
    userId,
    title,
    categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                title: {
                    contains: title,
                },
                categoryId,
                isPublished: true,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
            },
        });

        const coursesWithProgress: CourseWithProgressWithCategory[] = [];

        for (const course of courses) {
            const progress = await getProgress(userId, course.id);

            coursesWithProgress.push({
                ...course,
                progress,
            });
        }

        return coursesWithProgress;
    } catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
};