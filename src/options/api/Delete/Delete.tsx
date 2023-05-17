async function Delete(id: any) {
  const res = await fetch(process.env.API_URL + id, {
    method: "DELETE",
  });

  return (await res.status) === 200 && res.url;
}
export default Delete;
