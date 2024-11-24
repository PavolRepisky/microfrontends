export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  bio?: string;
};

let users: User[] = [
  {
    id: 1,
    firstName: "Lucas",
    lastName: "Dawson",
    phone: "(455) 2189 4842",
    email: "lucas.dawson@example.com",
    role: "admin",
    status: "active",
    bio: "Platform administrator with over five years of experience.",
  },
  {
    id: 2,
    firstName: "Ava",
    lastName: "Collins",
    phone: "(785) 1487 7870",
    email: "ava.collins@example.com",
    role: "tester",
    status: "active",
    bio: "A meticulous software tester with a passion for quality assurance.",
  },
  {
    id: 3,
    firstName: "Mason",
    lastName: "Turner",
    phone: "(821) 7818 5440",
    email: "mason.turner@example.com",
    role: "projectManager",
    status: "active",
    bio: "A dedicated project manager with a talent for leadership and organization.",
  },
  {
    id: 4,
    firstName: "Isabella",
    lastName: "Hughes",
    phone: "(482) 4567 7890",
    email: "isabella.hughes@example.com",
    role: "developer",
    status: "inactive",
    bio: "A passionate software developer specializing in front-end technologies.",
  },
  {
    id: 5,
    firstName: "Jackson",
    lastName: "Reed",
    phone: "(925) 1487 7870",
    email: "jackson.reed@example.com",
    role: "developer",
    status: "active",
    bio: "A creative front-end developer with a keen eye for design.",
  },
  {
    id: 6,
    firstName: "Emma",
    lastName: "Blake",
    phone: "(482) 7489 4540",
    email: "emma.blake@example.com",
    role: "tester",
    status: "active",
    bio: "A detail-oriented software tester dedicated to improving product quality.",
  },
  {
    id: 7,
    firstName: "Aiden",
    lastName: "Carter",
    phone: "(123) 4567 7890",
    email: "aiden.carter@example.com",
    role: "designer",
    status: "active",
    bio: "A UX/UI designer who believes in the power of user-centered design.",
  },
  {
    id: 8,
    firstName: "Sophia",
    lastName: "Brooks",
    phone: "(925) 7818 5440",
    email: "sophia.brooks@example.com",
    role: "designer",
    status: "invited",
    bio: "A visionary graphic designer with a passion for creativity.",
  },
  {
    id: 9,
    firstName: "Ethan",
    lastName: "Foster",
    phone: "(821) 8258 5487",
    email: "ethan.foster@example.com",
    role: "developer",
    status: "active",
    bio: "A dedicated back-end developer with expertise in cloud infrastructure.",
  },
  {
    id: 10,
    firstName: "Olivia",
    lastName: "Bennett",
    phone: "(785) 8258 5487",
    email: "olivia.bennett@example.com",
    role: "projectManager",
    status: "active",
    bio: "A results-driven project manager with over six years of experience.",
  },
];

export const getAllUsers = (): User[] => users;

export const getUserById = (id: number): User | undefined =>
  users.find((user) => user.id === id);

export const createUser = (user: Omit<User, "id">): User => {
  const newUser = { id: Date.now(), ...user };
  users.push(newUser);
  return newUser;
};

export const updateUser = (
  id: number,
  updatedData: Partial<User>
): User | null => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return null;
  users[userIndex] = { ...users[userIndex], ...updatedData };
  return users[userIndex];
};

export const deleteUser = (id: number): boolean => {
  const initialLength = users.length;
  users = users.filter((user) => user.id !== id);
  return users.length < initialLength;
};
