import {RESTDataSource} from "apollo-datasource-rest"

class TrackAPI extends RESTDataSource
{
  constructor() {
  super();
  this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';
  }

  getTracksForHome() {
    return this.get('tracks');
  }

  getAuthor(authorId: string) {
    return this.get(`author/${authorId}`);
  }
  getTrack(trackId: string) {
    return this.get(`track/${trackId}`);
  }
  getTrackModules(trackId:string) {
    return this.get(`track/${trackId}/modules`);
  }

  incrementTrackViews(trackId:string) {
    return this.patch(`track/${trackId}/numberOfViews`);
 }

}

export default TrackAPI;