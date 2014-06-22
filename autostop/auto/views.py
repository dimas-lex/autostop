
# -*- coding: utf-8 -*-
from django.template import RequestContext
from django.http import HttpResponseRedirect, Http404, HttpResponse
from django.core.urlresolvers import reverse

from django.shortcuts import render_to_response, render
# from django.template.context import RequestContext

import logging,  json
logger = logging.getLogger('autostop')

from autostop.auto.models import AUser
from autostop.auto.forms import AUserForm

def get_index_page(request, page=1):
    logger.debug("get_accounts_for_page:" + str(page))
    # page_count = Accounts.objects.values('porch').distinct().count()

    data = {
    #     'form': AccountShortModelForm(),
    #     'pages': range(1, page_count + 1),
    #     'current_page': page,
    }

    return render_to_response('html/index.html', RequestContext(request, data))


def list(request):
    # Handle file upload
    if request.method == 'POST':
        form = AUserForm(request.POST, request.FILES)
        if form.is_valid():
            # newdoc = Document(docfile = request.FILES['docfile'])
            # newdoc.save()

            # Redirect to the document list after POST
            return HttpResponseRedirect(reverse('myapp.views.list'))
    else:
        form = AUserForm() # A empty, unbound form

    # Load documents for the list page
    documents = AUser.objects.all()

    # Render list page with the documents and the form
    return render_to_response(
        'html/list.html',
        {'documents': documents, 'form': form},
        context_instance=RequestContext(request)
    )