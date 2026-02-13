
///NORMALIZACION DE DATOS

users = [
  { id: 1, name: "Ana", roles: ["admin", "editor"] },
  { id: 2, name: "Luis", roles: ["editor"] },
  { id: 1, name: "Ana", roles: ["viewer"] }
]

console.log(users);


function clean_users(users) {
    const filtered_users = [];
    const users_set = new Set();

    for (const user of users) {
        if (!users_set.has(user.id)) {
            users_set.add(user.id);
            filtered_users.push(user);
        }
    }

    return filtered_users;
}

console.log(clean_users(users));
