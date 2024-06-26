import axios from "axios";

export const transformUser = (dbUser) => ({
    id: dbUser.id,
    login: dbUser.login,
    roleId: dbUser.role_id,
    password: dbUser.password,
    registeredAt: dbUser.registed_at,
        address: dbUser.location.address,
        homeNumber: dbUser.location.homeNumber,
        flatNumber: dbUser.location.flatNumber,
    phone: dbUser.phone,
    registed_at: dbUser.registed_at,
})

export const getUserFetch = async (loginToFind) => {
  // return fetch(`/users?login=${loginToFind}`)
  return axios.get(`/users?login=${loginToFind}`)
  .then((loadedUser) => loadedUser.data)
  .then(([loadedUser]) => loadedUser && transformUser(loadedUser))
};
