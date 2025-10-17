'use server'

import prisma from '@/lib/prisma';

export async function getUniversityBySlug(slug: string) {
  try {
    const university = await prisma.university.findUnique({
      where: {
        slug: slug
      },
      include: {
        foodDeals: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    return university
  } catch (error) {
    console.error('Error fetching university by slug:', error)
    return null
  }
}

export async function getAllUniversitySlugs() {
  try {
    const universities = await prisma.university.findMany({
      select: {
        slug: true
      }
    })

    return universities.map((university) => ({
      slug: university.slug
    }))
  } catch (error) {
    console.error('Error fetching university slugs:', error)
    return []
  }
}
