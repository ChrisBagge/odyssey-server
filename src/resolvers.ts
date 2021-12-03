import { ApolloError } from "apollo-server-errors";
import TrackAPI from "./datasources/track-api";

const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (_: undefined, __: {}, { dataSources }: { dataSources: { trackAPI: TrackAPI } }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    track: (_: undefined, { id }: { id: string }, { dataSources }: { dataSources: { trackAPI: TrackAPI } }) => {
      return dataSources.trackAPI.getTrack(id);
    },
  },
  Track: {
    author: ({ authorId }: { authorId: string }, _: {}, { dataSources }: { dataSources: { trackAPI: TrackAPI } }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: ({ id }: { id: string }, _: {}, { dataSources }: { dataSources: { trackAPI: TrackAPI } }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
    durationInSeconds: ({ length }: { length: number }) => length,

  },
  Module: {
    durationInSeconds: ({ length }: { length: number }) => length,
  },

  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_: undefined, { id }: { id: string }, { dataSources }: { dataSources: { trackAPI: TrackAPI } }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        };
      };
    },
  }
  // get a single track by ID, for the track page
}



export default resolvers;