const allUsers: User[] = [];

class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  cpf: string;

  private constructor({ name, email, password, cpf }: User) {
    return Object.assign(this, { name, email, password, cpf });
  }

  static create({ name, email, password, cpf }: User) {
    const newUser = new User({ name, email, password, cpf });
    newUser.isActive = true;
    allUsers.push(newUser);
    return newUser;
  }

  static list(): User[] {
    return allUsers;
  }

  static listById(id: string): User {
    const oneUser = allUsers.find((user) => user.id === id);
    return oneUser;
  }
}

export { User };
