from faceswapper import *
import os

OWN_PATH = os.path.dirname(os.path.realpath(__file__)) + '/'
ADS_PATH = OWN_PATH + '../resources/images/ads/'
PERSONALIZED_PATH = OWN_PATH + '../resources/images/personalized_ads/'
TESTER_USER = OWN_PATH + 'tester.jpg'
ads = next(os.walk(ADS_PATH))[2]
for ad in ads:
	try:
		print "Trying: " + ad
		swap(ADS_PATH + ad, TESTER_USER)
		os.remove(PERSONALIZED_PATH + 'tester_' + ad)
	except (NoFaces, TooManyFaces):
		os.rename(ADS_PATH + ad, ADS_PATH + 'dont_work/' + ad)
	except OSError:
		pass