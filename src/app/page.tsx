// import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Aaryan Mori
      </h1>
      <p className="mb-4">
        {`I’m Aaryan—a software engineer and founder with 5+ years of experience architecting secure,
         high-performance systems across early-stage teams.
          I've led everything from modernizing legacy platforms at scale to launching 15+ full-stack applications 
          through my own dev agency. I don't just write code—I design resilient architectures, ship fast, and build with intention. 
          Whether it's leading a platform migration, scaling a product from zero, or shaping clean user experiences, 
          I bring both an engineer's precision and a founder's urgency to every project I take on.`}
      </p>
      <div className="my-8">{/* <BlogPosts /> */}</div>
    </section>
  );
}
