import Navbar from "../components/Navbar";

const Index = () => (
  <section>
    <Navbar />
    <h1>Hello World from Next</h1>
    <style jsx global>
      {`
        a {
          padding: 10px;
          text-decoration: none;
          color: blue;
        }
      `}
    </style>
  </section>
);

export default Index;
