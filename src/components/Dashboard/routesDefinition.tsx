import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faLayerGroup, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

export default function routesDefinition() {
  return [
    {
      path: "/templates",
      name: "Templates",
      icon: <FontAwesomeIcon icon={faDatabase} />,
    },
    {
      path: "/library",
      name: "Library",
      icon: <FontAwesomeIcon icon={faPhotoFilm} />,
    },
    // {
    //   path: "/rendered",
    //   name: "Rendered",
    //   icon: <FontAwesomeIcon icon={faLayerGroup} />,
    // },
  ];
}
