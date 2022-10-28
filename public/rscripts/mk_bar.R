
args = (commandArgs(TRUE))

if(length(args)==0){
  print("No arguments supplied.")
}else{
  for(i in 1:length(args)){
    eval(parse(text = args[[i]]))
  }
}

setwd("C:\\Users\\jimin\\vscode-workspace\\express_test\\public\\file")
wdFormat <- ".\\%s"
wd <- sprintf(wdFormat,ip)
setwd(wd)

userfile <- paste0(userfilename,".csv")

csv_data <- read.csv(userfile, header = TRUE)

setwd("C:\\Users\\jimin\\vscode-workspace\\express_test\\public\\images\\userGraph")
wdFormat2 <- ".\\%s"
wd <- sprintf(wdFormat2,ip)
dir.create(wd)
setwd(wd)

names(csv_data)[4] <- c("����")
csv_data$co2 <- as.numeric(gsub(",","",csv_data$co2))

csv_data$�����ð� <- sub("T ","",csv_data$�����ð�)
csv_data$�����ð� <- as.POSIXct(csv_data$�����ð�, format = "%Y-%m-%d %H:%M")
head(csv_data$�����ð�)

#install.packages("ggplot2")
library(ggplot2)
library(dplyr)

#�µ�
a <- csv_data%>%
  ggplot(aes(�µ�, group=1))+ 
  geom_bar(color = 'coral')+
  ggtitle("Temperature")+
  xlab("Temperature") + ylab("Temperature")+
  theme_light()+
  theme(plot.title = element_text(size=20, hjust = 0.5))
ggsave(filename = "Temperature.png", plot = a, width = 12, height = 6)

#����
b <- csv_data%>%
  ggplot(aes(����, group=1))+ 
  geom_bar(color = 'cyan')+
  ggtitle("Humidity")+
  xlab("Time") + ylab("Humidity")+
  theme_light()+
  theme(plot.title = element_text(size=20, hjust = 0.5))
ggsave(filename = "Humidity.png", plot = b, width = 12, height = 6)

#����
c <- csv_data%>%
  ggplot(aes(����, group=1))+ 
  geom_bar(color = 'yellow')+
  ggtitle("Illumination")+
  xlab("Time") + ylab("Illumination")+
  theme_light()+
  theme(plot.title = element_text(size=20, hjust = 0.5))
ggsave(filename = "Illumination.png", plot = c, width = 12, height = 6)

#co2
d <- csv_data%>%
  ggplot(aes(co2, group=1))+ 
  geom_bar(color = 'darkviolet')+
  ggtitle("CO2")+
  xlab("Time") + ylab("CO2")+
  theme_light()+
  theme(plot.title = element_text(size=20, hjust = 0.5))
ggsave(filename = "CO2.png", plot = d, width = 12, height = 6)

#vpd
e <- csv_data%>%
  ggplot(aes(vpd, group=1))+ 
  geom_bar(color = 'springgreen')+
  ggtitle("Vapor Pressure Deficit")+
  xlab("Time") + ylab("vpd")+
  annotate("rect",xmin=csv_data$�����ð�[1], xmax=csv_data$�����ð�[length(csv_data$�����ð�)] , ymin=0.5, ymax=1.2, alpha=0.2, fill="red")+
  theme_light()+
  theme(plot.title = element_text(size=20, hjust = 0.5))
ggsave(filename = "VPD.png", plot = e, width = 12, height = 6)

#�Լ���
if(names(csv_data)[11]=="�Լ���" || names(csv_data)[10]=="�Լ���" ){
  csv_data <- subset(csv_data, �Լ���>67 & �Լ���<73)
  f <- csv_data%>%
    ggplot(aes(�Լ���, group=1))+ 
    geom_bar(color = 'dodgerblue')+
    ggtitle("Moisture Content")+
    xlab("Time") + ylab("Moisture content")+
    theme_light()+
    theme(plot.title = element_text(size=20, hjust = 0.5))
  ggsave(filename = "Moisture content.png", plot = f, width = 12, height = 6)
}else{
  print("No Moisture content")
}


