import { Controller, Get, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  /** GET /api/v1/courses */
  @Get()
  getCatalog(
    @Query('page') page = '1',
    @Query('limit') limit = '12',
    @Query('category') category?: string,
    @Query('difficulty') difficulty?: string,
    @Query('search') search?: string,
  ) {
    return this.coursesService.getCatalog({
      page: parseInt(page),
      limit: parseInt(limit),
      category,
      difficulty,
      search,
    });
  }

  /** GET /api/v1/courses/featured */
  @Get('featured')
  getFeatured() {
    return this.coursesService.getFeaturedCourses(6);
  }

  /** GET /api/v1/courses/categories */
  @Get('categories')
  getCategories() {
    return this.coursesService.getCategories();
  }

  /** GET /api/v1/courses/:slug — public course detail */
  @Get(':slug')
  getCourse(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug);
  }

  /** GET /api/v1/courses/:slug/learn — protected full content for learner */
  @UseGuards(JwtAuthGuard)
  @Get(':slug/learn')
  getLearnContent(@Param('slug') slug: string) {
    return this.coursesService.getCourseBySlug(slug);
  }

  /** GET /api/v1/courses/lesson/:id */
  @UseGuards(JwtAuthGuard)
  @Get('lesson/:id')
  getLesson(@Param('id') id: string) {
    return this.coursesService.getLessonById(id);
  }

  /** GET /api/v1/courses/module/:id */
  @UseGuards(JwtAuthGuard)
  @Get('module/:id')
  getModule(@Param('id') id: string) {
    return this.coursesService.getModuleById(id);
  }
}
