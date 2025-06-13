import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

const syncthing = new docker.RemoteImage("syncthing", { name: "lscr.io/linuxserver/syncthing@sha256:9026ba9209fa561b4d68ac38659f95620778e2d4336bd1665de25baa507a36f3" }); // renovate

const syncthingContainer = new docker.Container("syncthing", {
  image: syncthing.imageId,
  name: "syncthing",
  networkMode: "host", // For IPv6
  hostname: "syncthing-nas",
  volumes: [
    {
      containerPath: "/config",
      hostPath: "/home/ubuntu/config/syncthing",
    },
    {
      containerPath: "/nfs4",
      hostPath: "/srv/nfs4",
    },
  ],
  envs: [
    "PUID=1000",
    "GUID=1000",
    "TZ=Asia/Kolkata",
  ],
  // ports: [
  //   {
  //     internal: 8384,
  //     external: 8384,
  //   },
  //   {
  //     internal: 22000,
  //     external: 22000,
  //     protocol: "tcp",
  //   },
  //   {
  //     internal: 22000,
  //     external: 22000,
  //     protocol: "udp",
  //   },
  //   {
  //     internal: 21027,
  //     external: 21027,
  //     protocol: "udp",
  //   },
  // ],
});
