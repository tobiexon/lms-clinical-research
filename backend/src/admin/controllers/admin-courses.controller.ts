import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminCoursesService } from '../services/admin-courses.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminCoursesController {
  constructor(private svc: AdminCoursesService) {}

  // ── Categories ──
  @Get('categories')           listCategories()                     { return this.svc.listCategories(); }
  @Post('categories')          createCategory(@Body() b: any)       { return this.svc.createCategory(b); }
  @Put('categories/:id')       updateCategory(@Param('id') id: string, @Body() b: any) { return this.svc.updateCategory(id, b); }
  @Delete('categories/:id')    deleteCategory(@Param('id') id: string)                 { return this.svc.deleteCategory(id); }

  // ── Courses ──
  @Get('courses')              listCourses()                        { return this.svc.listCourses(); }
  @Get('courses/:id')          getCourse(@Param('id') id: string)   { return this.svc.getCourse(id); }
  @Post('courses')             createCourse(@Body() b: any)         { return this.svc.createCourse(b); }
  @Put('courses/:id')          updateCourse(@Param('id') id: string, @Body() b: any)   { return this.svc.updateCourse(id, b); }
  @Delete('courses/:id')       deleteCourse(@Param('id') id: string)                   { return this.svc.deleteCourse(id); }
  @Patch('courses/:id/publish') togglePublish(@Param('id') id: string)                 { return this.svc.togglePublished(id); }

  // ── Modules ──
  @Post('courses/:courseId/modules')  createModule(@Param('courseId') courseId: string, @Body() b: any) { return this.svc.createModule(courseId, b); }
  @Put('modules/:id')                 updateModule(@Param('id') id: string, @Body() b: any)              { return this.svc.updateModule(id, b); }
  @Delete('modules/:id')              deleteModule(@Param('id') id: string)                               { return this.svc.deleteModule(id); }

  // ── Lessons ──
  @Post('modules/:moduleId/lessons')  createLesson(@Param('moduleId') moduleId: string, @Body() b: any) { return this.svc.createLesson(moduleId, b); }
  @Put('lessons/:id')                 updateLesson(@Param('id') id: string, @Body() b: any)              { return this.svc.updateLesson(id, b); }
  @Delete('lessons/:id')              deleteLesson(@Param('id') id: string)                               { return this.svc.deleteLesson(id); }

  // ── Quizzes ──
  @Post('modules/:moduleId/quizzes')  createQuiz(@Param('moduleId') moduleId: string, @Body() b: any)   { return this.svc.createQuiz(moduleId, b); }
  @Put('quizzes/:id')                 updateQuiz(@Param('id') id: string, @Body() b: any)                { return this.svc.updateQuiz(id, b); }
  @Delete('quizzes/:id')              deleteQuiz(@Param('id') id: string)                                 { return this.svc.deleteQuiz(id); }

  // ── Questions ──
  @Post('quizzes/:quizId/questions')  createQuestion(@Param('quizId') quizId: string, @Body() b: any)   { return this.svc.createQuestion(quizId, b); }
  @Put('questions/:id')               updateQuestion(@Param('id') id: string, @Body() b: any)             { return this.svc.updateQuestion(id, b); }
  @Delete('questions/:id')            deleteQuestion(@Param('id') id: string)                              { return this.svc.deleteQuestion(id); }
}
