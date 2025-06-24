export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Blog</h1>
      <p className="mb-4">Coming soon ...</p>
      <div className="my-8">{/* <BlogPosts /> */}</div>
    </section>
  );
}
