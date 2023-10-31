import React from "react";
import Image from "next/image";
import styles from "../../styles/Navbar.module.css";
import { generalSearch } from "../api/search.api";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import "../globals.css";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [searchInput, setSearchInput] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleSearch = async (e: any) => {
    e.preventDefault();
    console.log("searching...");
    console.log(searchInput);
    const data = await generalSearch(searchInput);
    console.log("data from search api call");
    console.log(data);
    setSearchResults(data); // Assuming data is an array of results.
    if (data && data.length > 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function goToUserSettings() {
    console.log("go to user settings button pressed!");
  }

  async function goToUserTimeline() {
    console.log("go to user timeline button pressed!");
  }

  async function gotoDashboard() {
    console.log("go to dashboard button pressed!");
    router.push("/dashboard");
  }

  return (
    <div className={styles.navbar}>
      <ScoreboardIcon className={styles.icon} onClick={gotoDashboard} />
      <input
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        placeholder="search"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      <button className={styles.button} type="submit" onClick={handleSearch}>
        Search
      </button>

      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <List>
              {searchResults.map((result: any, idx) => (
                <Link href={`/visit/${result.user_id}`} key={idx}>
                  <ListItem
                    button
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    {result.avatar === "" ? (
                      <ScoreboardIcon />
                    ) : (
                      <Image
                        width={1}
                        height={1}
                        src={result.avatar}
                        alt="User Avatar"
                      />
                    )}
                    <ListItemText primary={result.username} />
                    {result.following === true ? "following" : ""}
                  </ListItem>
                </Link>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
}
