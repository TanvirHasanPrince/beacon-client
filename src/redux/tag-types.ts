export enum tagTypes {
  member = "member",
  doctor = "doctor",
  admin = "admin",
  pet = "pet",
  event = "event",
  journal = "journal",
}

export const tagTypesList = [
  tagTypes.member,
  tagTypes.doctor,
  tagTypes.admin,
  tagTypes.pet,
  tagTypes.event,
  tagTypes.journal,
];

/*
These tags gets used like this:

after a post request, if I set InvalidateTages="That tag name". Then another request will be made to GET the request. 


*/
