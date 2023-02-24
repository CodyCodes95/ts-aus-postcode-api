# Aus Postcode Radius Search

I was recently faced with a problem. I was required to query a large database of addresses and find matches that fell within a certain radius. The database had no concept of distance (not lat longs stored etc) and I was unable to write any new data to the database to rectify this.

My first thought was, use Google Geocoder to geocode all of the results, calculate distance and return all matches. This would be very inefficient, and costly considering the size of the database.

The database did however have postcodes! My solution, query the database for all postcodes which fell within a certain radius to greatly reduce the amount of results, then Geocode all of those to ensure only results within my desired range were returned.

I needed an API that would return to me all postcodes within a radius from a center location, so I built this.

Is this the best solution? I dunno, maybe? But it worked for me.