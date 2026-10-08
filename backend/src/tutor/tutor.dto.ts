import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class AskTutorDto {
  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  question: string;

  @IsOptional()
  @IsString()
  courseSlug?: string; // used to gate access to course-specific tutor
}
