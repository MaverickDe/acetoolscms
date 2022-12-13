let init = (ccc) => {
  let dif = 10;
  let dif2 = 20;
 ccc.style.position = "relative";
  let currentTag;

  // let ccc = document.querySelector(".ccc");

  expand = false;

  let selectedtag;

  ccc.onmousemove = (e) => {
    let extoolls = ccc.querySelector(".extools");

    let pa = e.currentTarget;

    let ch = e.toElement;

    let imm = (pa, ch, e) => {
      let extools = ccc.querySelectorAll("#extools");

      let ofx = e.clientX - e.currentTarget.getBoundingClientRect().x;
      let ofy = e.clientY - e.currentTarget.getBoundingClientRect().y;
      let ext = (ch) => {
        return Array.from(extools).find((e) => e == ch);
      };

      if (ext(ch) && !expand) {
        let mm = Array.from(currentTag.querySelectorAll("*"));

        if (selectedtag) {
          let vv = Array.from(selectedtag.querySelectorAll("*"));

          mm = mm.concat(vv);
        }

        ch = (() => {
          let red = mm.reduce((tot, acc) => {
            let x_ =
              acc.getBoundingClientRect().x - ccc.getBoundingClientRect().x;
            let y_ =
              acc.getBoundingClientRect().y - ccc.getBoundingClientRect().y;
            let height = acc.offsetHeight;
            let width = acc.offsetWidth;
            let xadd = x_ + width;
            let yadd = y_ + height;

            if (ofx >= x_ && ofx <= xadd && ofy >= y_ && ofy <= yadd) {
              if (!tot) {
                tot = [];
              }
              tot.push(acc);
            }

            return tot;
          }, false);

          if (red) {
            return red[red.length - 1];
          } else {
            return pa;
          }
        })();
      }

      if ((ch == pa || !pa.contains(e.toElement) || ext(ch)) && !expand) {
        return;
      }

      currentTag = ch;
      let height = ch.offsetHeight;
      let width = ch.offsetWidth;

      let x = ch.getBoundingClientRect().x - pa.getBoundingClientRect().x;
      let y = ch.getBoundingClientRect().y - pa.getBoundingClientRect().y;

      let cx = x + width / 2;
      let cy = y + height / 2;

      style = `
           position:absolute;
           top:${y - dif}px;
           left:${x - dif}px;
           height:${height + dif2}px;
           width:${width + dif2}px;
           z-index:40;
           
           `;

      over(style, ch, { x, y, cx, cy, height, width, ofx, ofy });
    };

    imm(pa, ch, e);
  };

  let over = (style, tag, val, selectedid) => {
    let extools = ccc.querySelector(
      "div[class='extools extools_ notselectedextools']"
    );
    //    console.log(extools)
    if (!expand) {
      if (extools) {
        ccc.removeChild(extools);
      }

      let parent = document.createElement("div");
      let con = document.createElement("div");
      child = [1, 2, 3, 4].map((e) => document.createElement("div"));
      let constyle = `
                        position :relative;
                        width:100%;
                        height:100%;
    
            
            
                
                `;

      parent.setAttribute("style", style);
      parent.setAttribute("class", "extools extools_ notselectedextools");

      parent.setAttribute("id", "extools");
      parent.appendChild(con);

      con.setAttribute("style", constyle);
      con.setAttribute("id", "extools");
      con.setAttribute("class", "extools_");
      child.forEach((e) => {
        let style = `
                    width:7px;
                    height:7px;
                    border-radius:50%;
                    background-color:black;
                    position:absolute;
                    
                    
                    `;
        e.setAttribute("id", "extools");
        e.setAttribute("style", style);
        con.appendChild(e);

        e.onmousedown = () => {
          expand = {
            c: e,
            tag,
            ...val,
            parent,
          };
          console.log(e, "lkskskskskskskks");
        };
      });

      let [c1, c2, c3, c4] = child;

      c1.style.left = "0px";
      c1.style.top = "0px";
      c1.style.cursor = "nw-resize";
      c1.setAttribute("data", "c1");

      c2.style.left = "0px";
      c2.setAttribute("data", "c2");
      c2.style.cursor = "ne-resize";
      c2.style.bottom = "0px";

      c3.style.right = "0px";
      c3.style.cursor = "nw-resize";
      c3.setAttribute("data", "c3");
      c3.style.bottom = "0px";

      c4.style.right = "0px";
      c4.setAttribute("data", "c4");
      c4.style.cursor = "ne-resize";
      c4.style.top = "0px";

      ccc.appendChild(parent);
      parent.onmouseleave = (e) => {
        if (!expand && selectedtag != tag) {
          ccc.removeChild(parent);
        }
      };

      // tag.ondblclick = () => {};

      parent.ondblclick = (e) => {
        console.log("dbllll");
        if (selectedtag == tag) {
          selectedtag = false;
          parent.style.border = null;
          parent.classList.add("notselectedextools");
          parent.classList.remove("selectedextools");
        } else {
          console.log("jhjhj");
          if (toolbar.ondblclick) {
            tag.ondblclick();
          }
          let extools = ccc.querySelector(
            "div[class='extools extools_ selectedextools']"
          );
          //    console.log(extools)
          if (selectedtag != tag) {
            if (extools) {
              ccc.removeChild(extools);
            }
          }
          selectedtag = tag;
          parent.style.border = " 1px dashed grey";
          parent.classList.remove("notselectedextools");
          parent.classList.add("selectedextools");
        }
      };
    }

    if (expand) {
      let c = expand.c;

      console.log(c.getAttribute("data"));

      switch (c.getAttribute("data")) {
        case "c3":
          (() => {
            let y = Math.abs(
              expand.height + (val.ofy - (expand.y + expand.height) - dif2)
            );
            let cy = y + dif2;
            let x = Math.abs(
              expand.width + (val.ofx - (expand.x + expand.width) - dif2)
            );
            let cx = x + dif2;
            if (y > -1) {
              expand.tag.style.height = `${y}px`;
              expand.parent.style.height = `${cy}px`;
            }
            if (x > -1) {
              expand.tag.style.width = `${x}px`;
              expand.parent.style.width = `${cx}px`;
            }
            let xpoint =
              expand.tag.getBoundingClientRect().x -
              ccc.getBoundingClientRect().x;
            let ypoint =
              expand.tag.getBoundingClientRect().y -
              ccc.getBoundingClientRect().y;
            // console.log(xpoint, expand.tag.getBoundingClientRect().x, expand.x)
            expand.parent.style.top = `${ypoint - dif}px`;
            expand.parent.style.left = `${xpoint - dif}px`;
          })();

          break;
        case "c4":
          (() => {
            let cy = expand.height + dif2 + (expand.y - dif - val.ofy);
            let y = cy - dif2;

            let cx =
              expand.width +
              dif2 +
              (val.ofx - (expand.x + dif + expand.width + dif2));
            let x = cx - dif2;

            if (x > -1) {
              expand.tag.style.width = `${x}px`;

              expand.parent.style.width = `${cx}px`;
            }

            if (y > -1) {
              expand.tag.style.height = `${y}px`;

              expand.parent.style.height = `${cy}px`;
            }
            // console.log(top,val.ofy)

            let xpoint =
              expand.tag.getBoundingClientRect().x -
              ccc.getBoundingClientRect().x;
            let ypoint =
              expand.tag.getBoundingClientRect().y -
              ccc.getBoundingClientRect().y;

            expand.parent.style.top = `${ypoint - dif}px`;
            expand.parent.style.left = `${xpoint - dif}px`;
          })();

          break;

        case "c2":
          (() => {
            let y =
              expand.height +
              dif2 +
              (val.ofy - (expand.y - dif + expand.height + dif) - dif2);
            let cy = y + dif2;

            let cx = expand.width + dif2 - (val.ofx - (expand.x - dif));
            let x = cx - dif2;

            if (y > -1) {
              expand.tag.style.height = `${y}px`;

              expand.parent.style.height = `${cy}px`;
            }
            if (x > -1) {
              expand.tag.style.width = `${x}px`;

              expand.parent.style.width = `${cx}px`;
            }

            let xpoint =
              expand.tag.getBoundingClientRect().x -
              ccc.getBoundingClientRect().x;
            let ypoint =
              expand.tag.getBoundingClientRect().y -
              ccc.getBoundingClientRect().y;

            expand.parent.style.top = `${ypoint - dif}px`;
            expand.parent.style.left = `${xpoint - dif}px`;
          })();

          break;

        case "c1":
          (() => {
            let cy = expand.height + dif2 + (expand.y - dif - val.ofy);

            let y = cy - dif2;

            let cx = expand.width + dif2 - (val.ofx - (expand.x - dif));
            let x = cx - dif2;

            if (y > -1) {
              expand.tag.style.height = `${y}px`;

              expand.parent.style.height = `${cy}px`;
            }

            if (x > -1) {
              expand.tag.style.width = `${x}px`;

              expand.parent.style.width = `${cx}px`;
            }

            let xpoint =
              expand.tag.getBoundingClientRect().x -
              ccc.getBoundingClientRect().x;
            let ypoint =
              expand.tag.getBoundingClientRect().y -
              ccc.getBoundingClientRect().y;
            // console.log(xpoint, expand.tag.getBoundingClientRect().x,expand.x)
            expand.parent.style.top = `${ypoint - dif}px`;
            expand.parent.style.left = `${xpoint - dif}px`;
          })();

          break;
      }
    }
  };
  ccc.onmouseup = () => {
    expand = false;
  };
};

// init(ccc)
