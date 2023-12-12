// import React, { useEffect, useState } from "react";
// import { api } from "../../urls";
// import Footer from "./common/footer";
// import Header from "./common/header";
// import { useTranslation } from "react-i18next";

// function Career() {
//   const [count, setcount] = useState(true);
//   const [careerdata, setcareerdata] = useState({});

//   const { t } = useTranslation("career");

//   useEffect(() => {
//     if (count) {
//       var requestOptions = {
//         method: "GET",
//         redirect: "follow",
//       };

//       fetch(api + "/api/career", requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//           const updateData = {
//             title: result.title,
//             description: result.description,
//             image: result.image,
//           };
//           setcareerdata(updateData);
//         })
//         .catch((error) => console.log("error", error));
//       setcount(false);
//     }
//   }, [count]);

//   return (
//     <>
//       <Header />
//       <div className="container-fluid">
//         <div className="container">
//           <div className="career">
//             <h2>{t("careerdata.title")}</h2>
//             <p>{t("careerdata.description")}</p>
//             <img src={api + "/assets/cms/" + careerdata.image} />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Career;

// // import React, { useEffect, useState } from "react";
// // import { api } from "../../urls";
// // import Footer from "./common/footer";
// // import Header from "./common/header";
// // import { useTranslation } from "react-i18next";

// // function Career() {
// //   const [count, setcount] = useState(true);
// //   const [careerdata, setcareerdata] = useState({});

// //   const { t } = useTranslation("career");

// //   console.log(careerdata, "CAREER");

// //   useEffect(() => {
// //     if (count) {
// //       var requestOptions = {
// //         method: "GET",
// //         redirect: "follow",
// //       };

// //       fetch(api + "/api/career", requestOptions)
// //         .then((response) => response.json())
// //         .then((result) => {
// //           const updateData = {
// //             title: result.title,
// //             description: result.description,
// //             image: result.image,
// //           };
// //           setcareerdata(updateData);
// //         })
// //         .catch((error) => console.log("error", error));
// //       setcount(false);
// //     }
// //   }, [count]);

// //   return (
// //     <>
// //       <Header />
// //       <div className="container-fluid">
// //         <div className="container">
// //           <div className="career">
// //             <h2>{t("careerdata.title")}</h2>
// //             <p>{t("careerdata.description")}</p>
// //             <img src={api + "/assets/cms/" + careerdata.image} alt="Career" />
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }

// // export default Career;

import React, { useEffect, useState } from "react";
import { api } from "../../urls";
import Footer from "./common/footer";
import Header from "./common/header";
import { useTranslation } from "react-i18next";

function Career() {
  const [count, setcount] = useState(true);
  const [careerdata, setcareerdata] = useState({});

  const { t } = useTranslation("career");

  useEffect(() => {
    if (count) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(api + "/api/career", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const updateData = {
            title: result.data.title,
            description: result.data.description,
            image: result.data.image,
          };

          setcareerdata(updateData);
        })
        .catch((error) => console.log("error", error));
      setcount(false);
    }
  }, [count, t]);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="container">
          <div className="career">
            <h2>{t("title", { defaultValue: careerdata.title })}</h2>
            <p>{t("description", { defaultValue: careerdata.description })}</p>
            <img src={api + "/assets/cms/" + careerdata.image} alt="Career" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Career;
