import { render } from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Icon, ShowIconInEditorHandler } from "./types";
import Swal from "sweetalert2";



function Plugin() {
  const [icons, setIcons] = useState<Icon[]>([]); // State to store fetched icons

  // user payment date
  let paymentDate =  new Date("Tue Jun 04 2024 16:13:19 GMT+0600")
  const isUserPremium  = (): boolean => {
    const currentDate = new Date();
    const differenceInDays = Math.floor((currentDate - paymentDate) / (1000 * 60 * 60 * 24));
    return differenceInDays <= 1;
  };


  useEffect(() => {
    // Fetch icons from API
    fetchIcons();
  }, []);

  const fetchIcons = async () => {
    try {
      const response = await fetch(`https://icon-server.vercel.app/icons`);
      const data = await response.json();
      setIcons(data);
    } catch (error) {
      console.error("Error fetching icons:", error);
    }
  };

  const handleIconClick = (icon: Icon) => {
    // user use icon in logic
    if (isUserPremium() || icon.type === "free") {
      emit<ShowIconInEditorHandler>("SHOW_ICON_IN_EDITOR", icon.icon);
    } else {
      // // user can bye premum version
      Swal.fire({
        title: "Opps!",
        text: "Can you get premium icons?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open("https://olynex.com/", "_blank");
        }
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0F2167",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          position: "sticky",
          top: "0px",
          backgroundColor: "#006989",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
        Select Icon and make your day😀
      </h2>
      <hr
        style={{
          border: "1px solid gray",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {icons.map((icon: Icon) => (
          <div
            key={icon._id}
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "start",
            }}
          >
            {!isUserPremium() && (
              <span>
                {icon.type === "premium" ? (
                  <img
                    src="https://i.ibb.co/6y8yRv6/badge-7440624.png"
                    style={{ width: "15px" }}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </span>
            )}
            <img
              src={icon.icon}
              alt="Icon"
              onClick={() => handleIconClick(icon)}
              style={{
                cursor: "pointer",
                width: "45px",
                height: "45px",
                margin: "7px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default render(Plugin);
