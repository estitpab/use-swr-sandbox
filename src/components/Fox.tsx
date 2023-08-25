import useSWRImmutable from "swr/immutable";

const apiURL = "https://randomfox.ca/floof";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Fox = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable(
    apiURL,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const handleOnClick = () => {
    mutate();
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        {isValidating && (
          <p
            style={{ position: "absolute", textAlign: "center", width: "100%" }}
          >
            loading new picture..
          </p>
        )}
        <div
          style={{ height: "500px", background: "lightgrey", marginBottom: "20px" }}
        >
          <img
            key={data.image}
            style={{ maxHeight: "500px", width: "auto" }}
            src={data.image}
          />
        </div>
      </div>
      <button onClick={handleOnClick}>Refresh</button>
    </>
  );
};

export default Fox;
