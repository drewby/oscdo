FROM microsoft/aspnet

COPY ./bin/output /app

WORKDIR /app/approot/src/oscdo

EXPOSE 5001

ENTRYPOINT ["dnx", ".", "kestrel"]
