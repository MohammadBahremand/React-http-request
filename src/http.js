export default async function fetchAvailablePlaces() {
  const respons = await fetch("http://localhost:3000/places");
  const resData = await respons.json();
  if (!respons.ok) {
    throw new Error("Faild to fetching data ");
  }
  return resData.places;
}

export async function fetchUserPlaces() {
  const respons = await fetch("http://localhost:3000/user-places");
  const resData = await respons.json();
  if (!respons.ok) {
    throw new Error("Faild to fetching user data ");
  }
  return resData.places;
}



export async function updateUserPlace(places) {
  const respons = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({places}),
    headers: {
      "content-Type": "application/json",
    },
  });
  const resData = await respons.json();

  if (!respons.ok) {
    throw new Error("Faild to update user data ");
  }
  return resData.message;
}
