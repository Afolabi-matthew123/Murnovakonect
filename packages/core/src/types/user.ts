export interface CreateUserDto {
  email: string;
  password: string;
  displayName?: string;
  phone?: string;
  schoolId?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  displayName?: string;
  phone?: string;
  isActive?: boolean;
}
