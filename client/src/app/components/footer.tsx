/*

App Footer

*/

function Footer() {
  return (
    <footer
      style={{
        background: "#181818",
        color: "#fff",
        padding: "1rem 0",
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <p>&copy; {new Date().getFullYear()} Highlights. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
