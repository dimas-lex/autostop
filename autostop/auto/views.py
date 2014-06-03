from django.http import Http404, HttpResponse
from django.shortcuts import render_to_response, render
from django.template.context import RequestContext

import logging,  json
logger = logging.getLogger('autostop')


def get_index_page(request, page=1):
    logger.debug("get_accounts_for_page:" + str(page))
    # page_count = Accounts.objects.values('porch').distinct().count()

    data = {
    #     'form': AccountShortModelForm(),
    #     'pages': range(1, page_count + 1),
    #     'current_page': page,
    }

    return render_to_response('html/index.html', RequestContext(request, data))
