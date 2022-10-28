
args = (commandArgs(TRUE))

if(length(args)==0){
  print("No arguments supplied.")
}else{
  for(i in 1:length(args)){
    eval(parse(text = args[[i]]))
  }
}

setwd("D:\\vscode-workspace-for-Express\\express_test\\public\\file\\")
wdFormat <- ".\\%s"
wd <- sprintf(wdFormat,ip)
setwd(wd)

userfile <- paste0(userfilename,".csv")

csv_data <- read.csv(userfile, header = TRUE)

setwd("D:\\vscode-workspace-for-Express\\express_test\\public\\images\\userGraph\\")
wdFormat2 <- ".\\%s"
wd <- sprintf(wdFormat2,ip)
dir.create(wd)
setwd(wd)

names(csv_data)[4] <- c("광량")
csv_data$co2 <- as.numeric(gsub(",","",csv_data$co2))

csv_data$수집시간 <- sub("T ","",csv_data$수집시간)
csv_data$수집시간 <- as.POSIXct(csv_data$수집시간, format = "%Y-%m-%d %H:%M")


#install.packages("ggplot2")
#install.packages("dplyr")
library(ggplot2)
library(dplyr)

#온도
a <- csv_data%>%
  ggplot(aes(수집시간, 온도, group=1))+ 
  geom_line(color = 'coral')+
  ggtitle("Temperature")+
  xlab("Time") + ylab("Temperature")+
  theme_light()+
  theme(plot.title = element_text(size=20, hjust = 0.5))
ggsave(filename = "userImage.png", plot = a, width = 12, height = 6)


